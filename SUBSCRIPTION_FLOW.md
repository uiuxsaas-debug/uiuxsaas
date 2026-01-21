# Subscription, Billing & Credit Logic Documentation

## 1. Credit Cost Configuration
- Costs are centrally defined in `config/costs.ts`
- Current Costs:
  - Generate Screen: **50 Credits**
  - Edit Screen: **50 Credits**

## 2. Plan Structure
The application has 4 tiers defined in `config/plans.ts`:
- **Free**: 0 Credits/mo (Default)
- **Lite**: 2,000 Credits/mo ($7/mo or $60/yr)
- **Starter**: 7,500 Credits/mo ($20/mo or $168/yr)
- **Pro**: 20,000 Credits/mo ($50/mo or $420/yr)
- **Team**: 30,000 Credits/mo ($57/mo or $480/yr)

## 3. Subscription Flow & Credit Strategies

### A. Insufficient Credits Handling
- **Check Before Action**: The API checks users balance *before* any AI generation starts.
- **Fail Safe**: If `currentCredits < requiredCredits`, the API immediately returns `402 Payment Required` with a clear message: "You need X credits but only have Y."
- **No Negative Balances**: Since we deduct only after success, but check before start, balances should never go negative.

### B. Plan Upgrades & Credit Rollover Policy
**Policy: "New Cycle, New Quota" (No Rollover)**

When a user upgrades their plan (e.g. from Lite to Pro):
1. **Old Plan Ends**: The current billing cycle for the old plan is effectively terminated.
2. **New Plan Starts**: A new billing cycle starts immediately.
3. **Credits Reset**: The user is granted the **FULL** quota of the new plan immediately.
   - Example: Upgrade Lite (100 left) -> Pro (20000).
   - Analysis: User now has 20,000 credits.
   - Result: The old 100 credits are replaced, not added. This ensures clean billing cycles and prevents "infinite hoarding" of credits.
   - **Reasoning**: Monthly credits are a "Use it or Lose it" allowance for that specific month's subscription.

### C. Expiration Policy
- **Monthly Plans**: Credits expire at the end of the billing month when the Stripe invoice is paid.
- **Yearly Plans**: Credits expire on the "monthly anniversary" of the subscription start date.
  - Example: Sub started Jan 15th. On Feb 15th, any unused credits from Jan 15-Feb 15 are expired, and a fresh batch is added.
- **Cancellation**: If a user cancels, they lose all credits immediately upon the `subscription.deleted` event.

### D. Recurring Billing (Yearly Plans) - The "Lazy" Reset Logic
Stripe only charges once a year, so `invoice.payment_succeeded` only fires once.
To ensure users get fresh credits **every month**:

1. **Lazy Check (On User Action)**:
   - When user calls `api/generate-screen-ui` or `api/edit-screen`.
   - Function `checkAndResetCredits` (in `lib/credit-helper.ts`) is called.
   - It calculates the "Billing Day" (day of month sub started).
   - If User has entered a new month in their cycle AND `lastMonthlyReset` is from previous month:
     - **Credits Resets** to full quota.
     - `lastMonthlyReset` updated to Now.

2. **Proactive Check (Cron Job)**:
   - Daily Cron at `/api/cron/subscription-check`.
   - Scans all active Yearly users.
   - Performs same check as above and refreshes credits if needed.

## 4. Billing Portal (Manage Subscription)
- Located at `/dashboard/billing`.
- "Manage Subscription" button calls `/api/stripe/create-portal`.
- Redirects user to Stripe's hosted portal to Cancel/Upgrade/Update Card.

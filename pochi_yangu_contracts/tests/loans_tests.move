module pochi_yangu_contracts::loans_tests {
    use sui::test_scenario;
    use pochi_yangu_contracts::loans;

    #[test]
    fun test_apply_loan() {
        let scenario = test_scenario::begin(@0x0);
        let borrower = @0x1;

        // Apply for a loan
        loans::apply_loan(1000, borrower, test_scenario::ctx(&mut scenario));

        test_scenario::end(scenario);
    }
}
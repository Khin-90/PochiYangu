module pochi_yangu_contracts::loans {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    // Loan object
    struct Loan has key, store {
        id: UID,
        amount: u64,
        borrower: address,
    }

    // Function to apply for a loan
    public entry fun apply_loan(amount: u64, borrower: address, ctx: &mut TxContext) {
        // Create a new Loan object
        let loan = Loan {
            id: object::new(ctx),
            amount,
            borrower,
        };

        // Transfer the Loan object to the borrower
        transfer::transfer(loan, borrower);
    }

    // Function to repay a loan (example)
    public entry fun repay_loan(loan: Loan, ctx: &mut TxContext) {
        // Destroy the Loan object
        let Loan { id, amount: _, borrower: _ } = loan;
        object::delete(id);
    }
}
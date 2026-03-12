use anchor_lang::prelude::*;

#[error_code]
pub enum LockerError {
    #[msg("Not allowed authority")]
    NotAllowedAuthority,

    #[msg("Not yet started")]
    NotStarted,

    #[msg("Not locked such amount token")]
    InsufficientBalance,
    
    #[msg("Lock period is invalid")]
    InvalidLockTime,

    #[msg("Not locked")]
    NotLocked,
    
    #[msg("Lock period is not finished, yet")]
    NotAllowedYet,
    
    #[msg("Could not switch lock mode")]
    NotSwitchable,
    
    #[msg("Should be over minimum amount")]
    InsufficientAmount,

    #[msg("Incorrect User State")]
    IncorrectUserState,

    #[msg("Incorrect Referral Pubkey")]
    IncorrectReferral,
    
    #[msg("Already exceed invalid vesting count")]
    InvalidVestingCount,
    
    #[msg("Invalid id")]
    InvalidId,
}

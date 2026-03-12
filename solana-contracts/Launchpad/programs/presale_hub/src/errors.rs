use anchor_lang::prelude::*;

#[error_code]
pub enum PresaleError {
    #[msg("GlobalState was already initialized")]
    AlreadyInitialized,
    
    #[msg("Presale card was already created")]
    AlreadyCreated,
    
    #[msg("Presale not created yet")]
    NotCreated,
    
    #[msg("Presale not started yet")]
    NotStarted,
    
    #[msg("Presale already ended")]
    AlreadyEnded,
    
    #[msg("Presale not ended yet")]
    NotEndedYet,
    
    #[msg("Insufficient quote token amount")]
    InsufficientQuoteTokenAmount,
    
    #[msg("Quote token is wrong")]
    WrongQuoteToken,
    
    #[msg("Buy token amount is out of valid range")]
    InvalidBuyAmount,

    #[msg("Insufficient claimable token amount")]
    InsufficientClaimableAmount,
    
    #[msg("Not Claimable yet")]
    NotClaimableYet,
    
    #[msg("This presale was already finalized")]
    AlreadyFinalized,

    #[msg("Unauthorized")]
    Unauthorized,
    
    #[msg("Softcap should be less than Hardcap")]
    InvalidParams1,
    
    #[msg("Start time should be less than End time")]
    InvalidParams2,
    
    #[msg("Minimum buy amount should be less than Maximum buy amount")]
    InvalidParams3,
    
    #[msg("Wrong parameters")]
    InvalidParams,
    
    #[msg("Start time was already passed")]
    InvalidStartTime,
    
    #[msg("Invalid end time")]
    InvalidEndTime,
    
    #[msg("Invalid investor")]
    InvalidInvestor,
    
    #[msg("Not reached at softcap")]
    NotReachedAtSoftCap,
    
    #[msg("Reached at softcap")]
    ReachedAtSoftCap,
    
    #[msg("Overflow hardcap")]
    OverflowHardCap,
    
    #[msg("Not whitelisted quote token")]
    InvalidQuoteToken,
    
    #[msg("LP was already created")]
    LPAlreadyCreated,


}
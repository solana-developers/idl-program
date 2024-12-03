//! This code was AUTOGENERATED using the codama library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun codama to update it.
//!
//! <https://github.com/codama-idl/codama>
//!

use borsh::BorshDeserialize;
use borsh::BorshSerialize;

/// Accounts.
pub struct Resize {
      
              
          pub idl: solana_program::pubkey::Pubkey,
          
              
          pub signer: solana_program::pubkey::Pubkey,
          
              
          pub system_program: solana_program::pubkey::Pubkey,
          
              
          pub program_id: solana_program::pubkey::Pubkey,
      }

impl Resize {
  pub fn instruction(&self, args: ResizeInstructionArgs) -> solana_program::instruction::Instruction {
    self.instruction_with_remaining_accounts(args, &[])
  }
  #[allow(clippy::vec_init_then_push)]
  pub fn instruction_with_remaining_accounts(&self, args: ResizeInstructionArgs, remaining_accounts: &[solana_program::instruction::AccountMeta]) -> solana_program::instruction::Instruction {
    let mut accounts = Vec::with_capacity(4+ remaining_accounts.len());
                            accounts.push(solana_program::instruction::AccountMeta::new(
            self.idl,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            self.signer,
            true
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.system_program,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.program_id,
            false
          ));
                      accounts.extend_from_slice(remaining_accounts);
    let mut data = ResizeInstructionData::new().try_to_vec().unwrap();
          let mut args = args.try_to_vec().unwrap();
      data.append(&mut args);
    
    solana_program::instruction::Instruction {
      program_id: crate::METADATA_PROGRAM_ID,
      accounts,
      data,
    }
  }
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct ResizeInstructionData {
            discriminator: [u8; 8],
                  }

impl ResizeInstructionData {
  pub fn new() -> Self {
    Self {
                        discriminator: [74, 27, 74, 155, 56, 134, 175, 125],
                                              }
  }
}

impl Default for ResizeInstructionData {
  fn default() -> Self {
    Self::new()
  }
}

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, Eq, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub struct ResizeInstructionArgs {
                  pub len: u16,
                pub seed: String,
      }


/// Instruction builder for `Resize`.
///
/// ### Accounts:
///
                ///   0. `[writable]` idl
                      ///   1. `[writable, signer]` signer
                ///   2. `[optional]` system_program (default to `11111111111111111111111111111111`)
          ///   3. `[]` program_id
#[derive(Clone, Debug, Default)]
pub struct ResizeBuilder {
            idl: Option<solana_program::pubkey::Pubkey>,
                signer: Option<solana_program::pubkey::Pubkey>,
                system_program: Option<solana_program::pubkey::Pubkey>,
                program_id: Option<solana_program::pubkey::Pubkey>,
                        len: Option<u16>,
                seed: Option<String>,
        __remaining_accounts: Vec<solana_program::instruction::AccountMeta>,
}

impl ResizeBuilder {
  pub fn new() -> Self {
    Self::default()
  }
            #[inline(always)]
    pub fn idl(&mut self, idl: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.idl = Some(idl);
                    self
    }
            #[inline(always)]
    pub fn signer(&mut self, signer: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.signer = Some(signer);
                    self
    }
            /// `[optional account, default to '11111111111111111111111111111111']`
#[inline(always)]
    pub fn system_program(&mut self, system_program: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.system_program = Some(system_program);
                    self
    }
            #[inline(always)]
    pub fn program_id(&mut self, program_id: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.program_id = Some(program_id);
                    self
    }
                    #[inline(always)]
      pub fn len(&mut self, len: u16) -> &mut Self {
        self.len = Some(len);
        self
      }
                #[inline(always)]
      pub fn seed(&mut self, seed: String) -> &mut Self {
        self.seed = Some(seed);
        self
      }
        /// Add an additional account to the instruction.
  #[inline(always)]
  pub fn add_remaining_account(&mut self, account: solana_program::instruction::AccountMeta) -> &mut Self {
    self.__remaining_accounts.push(account);
    self
  }
  /// Add additional accounts to the instruction.
  #[inline(always)]
  pub fn add_remaining_accounts(&mut self, accounts: &[solana_program::instruction::AccountMeta]) -> &mut Self {
    self.__remaining_accounts.extend_from_slice(accounts);
    self
  }
  #[allow(clippy::clone_on_copy)]
  pub fn instruction(&self) -> solana_program::instruction::Instruction {
    let accounts = Resize {
                              idl: self.idl.expect("idl is not set"),
                                        signer: self.signer.expect("signer is not set"),
                                        system_program: self.system_program.unwrap_or(solana_program::pubkey!("11111111111111111111111111111111")),
                                        program_id: self.program_id.expect("program_id is not set"),
                      };
          let args = ResizeInstructionArgs {
                                                              len: self.len.clone().expect("len is not set"),
                                                                  seed: self.seed.clone().expect("seed is not set"),
                                    };
    
    accounts.instruction_with_remaining_accounts(args, &self.__remaining_accounts)
  }
}

  /// `resize` CPI accounts.
  pub struct ResizeCpiAccounts<'a, 'b> {
          
                    
              pub idl: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub signer: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub system_program: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub program_id: &'b solana_program::account_info::AccountInfo<'a>,
            }

/// `resize` CPI instruction.
pub struct ResizeCpi<'a, 'b> {
  /// The program to invoke.
  pub __program: &'b solana_program::account_info::AccountInfo<'a>,
      
              
          pub idl: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub signer: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub system_program: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub program_id: &'b solana_program::account_info::AccountInfo<'a>,
            /// The arguments for the instruction.
    pub __args: ResizeInstructionArgs,
  }

impl<'a, 'b> ResizeCpi<'a, 'b> {
  pub fn new(
    program: &'b solana_program::account_info::AccountInfo<'a>,
          accounts: ResizeCpiAccounts<'a, 'b>,
              args: ResizeInstructionArgs,
      ) -> Self {
    Self {
      __program: program,
              idl: accounts.idl,
              signer: accounts.signer,
              system_program: accounts.system_program,
              program_id: accounts.program_id,
                    __args: args,
          }
  }
  #[inline(always)]
  pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed_with_remaining_accounts(&[], &[])
  }
  #[inline(always)]
  pub fn invoke_with_remaining_accounts(&self, remaining_accounts: &[(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)]) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed_with_remaining_accounts(&[], remaining_accounts)
  }
  #[inline(always)]
  pub fn invoke_signed(&self, signers_seeds: &[&[&[u8]]]) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed_with_remaining_accounts(signers_seeds, &[])
  }
  #[allow(clippy::clone_on_copy)]
  #[allow(clippy::vec_init_then_push)]
  pub fn invoke_signed_with_remaining_accounts(
    &self,
    signers_seeds: &[&[&[u8]]],
    remaining_accounts: &[(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)]
  ) -> solana_program::entrypoint::ProgramResult {
    let mut accounts = Vec::with_capacity(4+ remaining_accounts.len());
                            accounts.push(solana_program::instruction::AccountMeta::new(
            *self.idl.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            *self.signer.key,
            true
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.system_program.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.program_id.key,
            false
          ));
                      remaining_accounts.iter().for_each(|remaining_account| {
      accounts.push(solana_program::instruction::AccountMeta {
          pubkey: *remaining_account.0.key,
          is_signer: remaining_account.1,
          is_writable: remaining_account.2,
      })
    });
    let mut data = ResizeInstructionData::new().try_to_vec().unwrap();
          let mut args = self.__args.try_to_vec().unwrap();
      data.append(&mut args);
    
    let instruction = solana_program::instruction::Instruction {
      program_id: crate::METADATA_PROGRAM_ID,
      accounts,
      data,
    };
    let mut account_infos = Vec::with_capacity(5 + remaining_accounts.len());
    account_infos.push(self.__program.clone());
                  account_infos.push(self.idl.clone());
                        account_infos.push(self.signer.clone());
                        account_infos.push(self.system_program.clone());
                        account_infos.push(self.program_id.clone());
              remaining_accounts.iter().for_each(|remaining_account| account_infos.push(remaining_account.0.clone()));

    if signers_seeds.is_empty() {
      solana_program::program::invoke(&instruction, &account_infos)
    } else {
      solana_program::program::invoke_signed(&instruction, &account_infos, signers_seeds)
    }
  }
}

/// Instruction builder for `Resize` via CPI.
///
/// ### Accounts:
///
                ///   0. `[writable]` idl
                      ///   1. `[writable, signer]` signer
          ///   2. `[]` system_program
          ///   3. `[]` program_id
#[derive(Clone, Debug)]
pub struct ResizeCpiBuilder<'a, 'b> {
  instruction: Box<ResizeCpiBuilderInstruction<'a, 'b>>,
}

impl<'a, 'b> ResizeCpiBuilder<'a, 'b> {
  pub fn new(program: &'b solana_program::account_info::AccountInfo<'a>) -> Self {
    let instruction = Box::new(ResizeCpiBuilderInstruction {
      __program: program,
              idl: None,
              signer: None,
              system_program: None,
              program_id: None,
                                            len: None,
                                seed: None,
                    __remaining_accounts: Vec::new(),
    });
    Self { instruction }
  }
      #[inline(always)]
    pub fn idl(&mut self, idl: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.idl = Some(idl);
                    self
    }
      #[inline(always)]
    pub fn signer(&mut self, signer: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.signer = Some(signer);
                    self
    }
      #[inline(always)]
    pub fn system_program(&mut self, system_program: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.system_program = Some(system_program);
                    self
    }
      #[inline(always)]
    pub fn program_id(&mut self, program_id: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.program_id = Some(program_id);
                    self
    }
                    #[inline(always)]
      pub fn len(&mut self, len: u16) -> &mut Self {
        self.instruction.len = Some(len);
        self
      }
                #[inline(always)]
      pub fn seed(&mut self, seed: String) -> &mut Self {
        self.instruction.seed = Some(seed);
        self
      }
        /// Add an additional account to the instruction.
  #[inline(always)]
  pub fn add_remaining_account(&mut self, account: &'b solana_program::account_info::AccountInfo<'a>, is_writable: bool, is_signer: bool) -> &mut Self {
    self.instruction.__remaining_accounts.push((account, is_writable, is_signer));
    self
  }
  /// Add additional accounts to the instruction.
  ///
  /// Each account is represented by a tuple of the `AccountInfo`, a `bool` indicating whether the account is writable or not,
  /// and a `bool` indicating whether the account is a signer or not.
  #[inline(always)]
  pub fn add_remaining_accounts(&mut self, accounts: &[(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)]) -> &mut Self {
    self.instruction.__remaining_accounts.extend_from_slice(accounts);
    self
  }
  #[inline(always)]
  pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed(&[])
  }
  #[allow(clippy::clone_on_copy)]
  #[allow(clippy::vec_init_then_push)]
  pub fn invoke_signed(&self, signers_seeds: &[&[&[u8]]]) -> solana_program::entrypoint::ProgramResult {
          let args = ResizeInstructionArgs {
                                                              len: self.instruction.len.clone().expect("len is not set"),
                                                                  seed: self.instruction.seed.clone().expect("seed is not set"),
                                    };
        let instruction = ResizeCpi {
        __program: self.instruction.__program,
                  
          idl: self.instruction.idl.expect("idl is not set"),
                  
          signer: self.instruction.signer.expect("signer is not set"),
                  
          system_program: self.instruction.system_program.expect("system_program is not set"),
                  
          program_id: self.instruction.program_id.expect("program_id is not set"),
                          __args: args,
            };
    instruction.invoke_signed_with_remaining_accounts(signers_seeds, &self.instruction.__remaining_accounts)
  }
}

#[derive(Clone, Debug)]
struct ResizeCpiBuilderInstruction<'a, 'b> {
  __program: &'b solana_program::account_info::AccountInfo<'a>,
            idl: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                signer: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                system_program: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                program_id: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                        len: Option<u16>,
                seed: Option<String>,
        /// Additional instruction accounts `(AccountInfo, is_writable, is_signer)`.
  __remaining_accounts: Vec<(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)>,
}


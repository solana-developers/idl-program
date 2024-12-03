/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlySignerAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { METADATA_PROGRAM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const CLOSE_BUFFER_DISCRIMINATOR = new Uint8Array([
  46, 114, 179, 58, 57, 45, 194, 172,
]);

export function getCloseBufferDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    CLOSE_BUFFER_DISCRIMINATOR
  );
}

export type CloseBufferInstruction<
  TProgram extends string = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
  TAccountBuffer extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountBuffer extends string
        ? WritableAccount<TAccountBuffer>
        : TAccountBuffer,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      ...TRemainingAccounts,
    ]
  >;

export type CloseBufferInstructionData = { discriminator: ReadonlyUint8Array };

export type CloseBufferInstructionDataArgs = {};

export function getCloseBufferInstructionDataEncoder(): Encoder<CloseBufferInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({ ...value, discriminator: CLOSE_BUFFER_DISCRIMINATOR })
  );
}

export function getCloseBufferInstructionDataDecoder(): Decoder<CloseBufferInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getCloseBufferInstructionDataCodec(): Codec<
  CloseBufferInstructionDataArgs,
  CloseBufferInstructionData
> {
  return combineCodec(
    getCloseBufferInstructionDataEncoder(),
    getCloseBufferInstructionDataDecoder()
  );
}

export type CloseBufferInput<
  TAccountBuffer extends string = string,
  TAccountAuthority extends string = string,
> = {
  buffer: Address<TAccountBuffer>;
  authority: TransactionSigner<TAccountAuthority>;
};

export function getCloseBufferInstruction<
  TAccountBuffer extends string,
  TAccountAuthority extends string,
  TProgramAddress extends Address = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
>(
  input: CloseBufferInput<TAccountBuffer, TAccountAuthority>,
  config?: { programAddress?: TProgramAddress }
): CloseBufferInstruction<TProgramAddress, TAccountBuffer, TAccountAuthority> {
  // Program address.
  const programAddress =
    config?.programAddress ?? METADATA_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    buffer: { value: input.buffer ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.buffer),
      getAccountMeta(accounts.authority),
    ],
    programAddress,
    data: getCloseBufferInstructionDataEncoder().encode({}),
  } as CloseBufferInstruction<
    TProgramAddress,
    TAccountBuffer,
    TAccountAuthority
  >;

  return instruction;
}

export type ParsedCloseBufferInstruction<
  TProgram extends string = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    buffer: TAccountMetas[0];
    authority: TAccountMetas[1];
  };
  data: CloseBufferInstructionData;
};

export function parseCloseBufferInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCloseBufferInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      buffer: getNextAccount(),
      authority: getNextAccount(),
    },
    data: getCloseBufferInstructionDataDecoder().decode(instruction.data),
  };
}

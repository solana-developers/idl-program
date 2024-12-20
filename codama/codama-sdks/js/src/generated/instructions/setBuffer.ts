/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getAddressEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
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
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { METADATA_PROGRAM_PROGRAM_ADDRESS } from '../programs';
import {
  expectAddress,
  expectSome,
  getAccountMetaFactory,
  type ResolvedAccount,
} from '../shared';

export const SET_BUFFER_DISCRIMINATOR = new Uint8Array([
  13, 212, 241, 0, 78, 93, 17, 51,
]);

export function getSetBufferDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(SET_BUFFER_DISCRIMINATOR);
}

export type SetBufferInstruction<
  TProgram extends string = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
  TAccountBuffer extends string | IAccountMeta<string> = string,
  TAccountIdl extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountProgramId extends
    | string
    | IAccountMeta<string> = 'pmetaypqG6SiB47xMigYVMAkuHDWeSDXcv3zzDrJJvA',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountBuffer extends string
        ? WritableAccount<TAccountBuffer>
        : TAccountBuffer,
      TAccountIdl extends string ? WritableAccount<TAccountIdl> : TAccountIdl,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountProgramId extends string
        ? ReadonlyAccount<TAccountProgramId>
        : TAccountProgramId,
      ...TRemainingAccounts,
    ]
  >;

export type SetBufferInstructionData = {
  discriminator: ReadonlyUint8Array;
  seed: string;
};

export type SetBufferInstructionDataArgs = { seed: string };

export function getSetBufferInstructionDataEncoder(): Encoder<SetBufferInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['seed', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ]),
    (value) => ({ ...value, discriminator: SET_BUFFER_DISCRIMINATOR })
  );
}

export function getSetBufferInstructionDataDecoder(): Decoder<SetBufferInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['seed', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
  ]);
}

export function getSetBufferInstructionDataCodec(): Codec<
  SetBufferInstructionDataArgs,
  SetBufferInstructionData
> {
  return combineCodec(
    getSetBufferInstructionDataEncoder(),
    getSetBufferInstructionDataDecoder()
  );
}

export type SetBufferAsyncInput<
  TAccountBuffer extends string = string,
  TAccountIdl extends string = string,
  TAccountAuthority extends string = string,
  TAccountProgramId extends string = string,
> = {
  buffer: Address<TAccountBuffer>;
  idl?: Address<TAccountIdl>;
  authority: TransactionSigner<TAccountAuthority>;
  programId?: Address<TAccountProgramId>;
  seed: SetBufferInstructionDataArgs['seed'];
};

export async function getSetBufferInstructionAsync<
  TAccountBuffer extends string,
  TAccountIdl extends string,
  TAccountAuthority extends string,
  TAccountProgramId extends string,
  TProgramAddress extends Address = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
>(
  input: SetBufferAsyncInput<
    TAccountBuffer,
    TAccountIdl,
    TAccountAuthority,
    TAccountProgramId
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  SetBufferInstruction<
    TProgramAddress,
    TAccountBuffer,
    TAccountIdl,
    TAccountAuthority,
    TAccountProgramId
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? METADATA_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    buffer: { value: input.buffer ?? null, isWritable: true },
    idl: { value: input.idl ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    programId: { value: input.programId ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.programId.value) {
    accounts.programId.value = programAddress;
    accounts.programId.isWritable = false;
  }
  if (!accounts.idl.value) {
    accounts.idl.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder()).encode(
          expectSome(args.seed)
        ),
        getAddressEncoder().encode(expectAddress(accounts.programId.value)),
      ],
    });
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.buffer),
      getAccountMeta(accounts.idl),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.programId),
    ],
    programAddress,
    data: getSetBufferInstructionDataEncoder().encode(
      args as SetBufferInstructionDataArgs
    ),
  } as SetBufferInstruction<
    TProgramAddress,
    TAccountBuffer,
    TAccountIdl,
    TAccountAuthority,
    TAccountProgramId
  >;

  return instruction;
}

export type SetBufferInput<
  TAccountBuffer extends string = string,
  TAccountIdl extends string = string,
  TAccountAuthority extends string = string,
  TAccountProgramId extends string = string,
> = {
  buffer: Address<TAccountBuffer>;
  idl: Address<TAccountIdl>;
  authority: TransactionSigner<TAccountAuthority>;
  programId?: Address<TAccountProgramId>;
  seed: SetBufferInstructionDataArgs['seed'];
};

export function getSetBufferInstruction<
  TAccountBuffer extends string,
  TAccountIdl extends string,
  TAccountAuthority extends string,
  TAccountProgramId extends string,
  TProgramAddress extends Address = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
>(
  input: SetBufferInput<
    TAccountBuffer,
    TAccountIdl,
    TAccountAuthority,
    TAccountProgramId
  >,
  config?: { programAddress?: TProgramAddress }
): SetBufferInstruction<
  TProgramAddress,
  TAccountBuffer,
  TAccountIdl,
  TAccountAuthority,
  TAccountProgramId
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? METADATA_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    buffer: { value: input.buffer ?? null, isWritable: true },
    idl: { value: input.idl ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    programId: { value: input.programId ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.programId.value) {
    accounts.programId.value = programAddress;
    accounts.programId.isWritable = false;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.buffer),
      getAccountMeta(accounts.idl),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.programId),
    ],
    programAddress,
    data: getSetBufferInstructionDataEncoder().encode(
      args as SetBufferInstructionDataArgs
    ),
  } as SetBufferInstruction<
    TProgramAddress,
    TAccountBuffer,
    TAccountIdl,
    TAccountAuthority,
    TAccountProgramId
  >;

  return instruction;
}

export type ParsedSetBufferInstruction<
  TProgram extends string = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    buffer: TAccountMetas[0];
    idl: TAccountMetas[1];
    authority: TAccountMetas[2];
    programId: TAccountMetas[3];
  };
  data: SetBufferInstructionData;
};

export function parseSetBufferInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetBufferInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 4) {
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
      idl: getNextAccount(),
      authority: getNextAccount(),
      programId: getNextAccount(),
    },
    data: getSetBufferInstructionDataDecoder().decode(instruction.data),
  };
}

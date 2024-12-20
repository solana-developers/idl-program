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
  getU16Decoder,
  getU16Encoder,
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
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { METADATA_PROGRAM_PROGRAM_ADDRESS } from '../programs';
import {
  expectAddress,
  expectSome,
  getAccountMetaFactory,
  type ResolvedAccount,
} from '../shared';

export const RESIZE_DISCRIMINATOR = new Uint8Array([
  74, 27, 74, 155, 56, 134, 175, 125,
]);

export function getResizeDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(RESIZE_DISCRIMINATOR);
}

export type ResizeInstruction<
  TProgram extends string = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
  TAccountIdl extends string | IAccountMeta<string> = string,
  TAccountSigner extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountProgramId extends
    | string
    | IAccountMeta<string> = 'pmetaypqG6SiB47xMigYVMAkuHDWeSDXcv3zzDrJJvA',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountIdl extends string ? WritableAccount<TAccountIdl> : TAccountIdl,
      TAccountSigner extends string
        ? WritableSignerAccount<TAccountSigner> &
            IAccountSignerMeta<TAccountSigner>
        : TAccountSigner,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountProgramId extends string
        ? ReadonlyAccount<TAccountProgramId>
        : TAccountProgramId,
      ...TRemainingAccounts,
    ]
  >;

export type ResizeInstructionData = {
  discriminator: ReadonlyUint8Array;
  len: number;
  seed: string;
};

export type ResizeInstructionDataArgs = { len: number; seed: string };

export function getResizeInstructionDataEncoder(): Encoder<ResizeInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['len', getU16Encoder()],
      ['seed', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ]),
    (value) => ({ ...value, discriminator: RESIZE_DISCRIMINATOR })
  );
}

export function getResizeInstructionDataDecoder(): Decoder<ResizeInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['len', getU16Decoder()],
    ['seed', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
  ]);
}

export function getResizeInstructionDataCodec(): Codec<
  ResizeInstructionDataArgs,
  ResizeInstructionData
> {
  return combineCodec(
    getResizeInstructionDataEncoder(),
    getResizeInstructionDataDecoder()
  );
}

export type ResizeAsyncInput<
  TAccountIdl extends string = string,
  TAccountSigner extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountProgramId extends string = string,
> = {
  idl?: Address<TAccountIdl>;
  signer: TransactionSigner<TAccountSigner>;
  systemProgram?: Address<TAccountSystemProgram>;
  programId?: Address<TAccountProgramId>;
  len: ResizeInstructionDataArgs['len'];
  seed: ResizeInstructionDataArgs['seed'];
};

export async function getResizeInstructionAsync<
  TAccountIdl extends string,
  TAccountSigner extends string,
  TAccountSystemProgram extends string,
  TAccountProgramId extends string,
  TProgramAddress extends Address = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
>(
  input: ResizeAsyncInput<
    TAccountIdl,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountProgramId
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  ResizeInstruction<
    TProgramAddress,
    TAccountIdl,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountProgramId
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? METADATA_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    idl: { value: input.idl ?? null, isWritable: true },
    signer: { value: input.signer ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
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
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.idl),
      getAccountMeta(accounts.signer),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.programId),
    ],
    programAddress,
    data: getResizeInstructionDataEncoder().encode(
      args as ResizeInstructionDataArgs
    ),
  } as ResizeInstruction<
    TProgramAddress,
    TAccountIdl,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountProgramId
  >;

  return instruction;
}

export type ResizeInput<
  TAccountIdl extends string = string,
  TAccountSigner extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountProgramId extends string = string,
> = {
  idl: Address<TAccountIdl>;
  signer: TransactionSigner<TAccountSigner>;
  systemProgram?: Address<TAccountSystemProgram>;
  programId?: Address<TAccountProgramId>;
  len: ResizeInstructionDataArgs['len'];
  seed: ResizeInstructionDataArgs['seed'];
};

export function getResizeInstruction<
  TAccountIdl extends string,
  TAccountSigner extends string,
  TAccountSystemProgram extends string,
  TAccountProgramId extends string,
  TProgramAddress extends Address = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
>(
  input: ResizeInput<
    TAccountIdl,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountProgramId
  >,
  config?: { programAddress?: TProgramAddress }
): ResizeInstruction<
  TProgramAddress,
  TAccountIdl,
  TAccountSigner,
  TAccountSystemProgram,
  TAccountProgramId
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? METADATA_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    idl: { value: input.idl ?? null, isWritable: true },
    signer: { value: input.signer ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
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
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.idl),
      getAccountMeta(accounts.signer),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.programId),
    ],
    programAddress,
    data: getResizeInstructionDataEncoder().encode(
      args as ResizeInstructionDataArgs
    ),
  } as ResizeInstruction<
    TProgramAddress,
    TAccountIdl,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountProgramId
  >;

  return instruction;
}

export type ParsedResizeInstruction<
  TProgram extends string = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    idl: TAccountMetas[0];
    signer: TAccountMetas[1];
    systemProgram: TAccountMetas[2];
    programId: TAccountMetas[3];
  };
  data: ResizeInstructionData;
};

export function parseResizeInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedResizeInstruction<TProgram, TAccountMetas> {
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
      idl: getNextAccount(),
      signer: getNextAccount(),
      systemProgram: getNextAccount(),
      programId: getNextAccount(),
    },
    data: getResizeInstructionDataDecoder().decode(instruction.data),
  };
}

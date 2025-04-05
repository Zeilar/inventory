declare module "to-uint8" {
  /**
   * Converts input data into a Uint8Array. If detectFloat is true, floats are mapped to the full uint8 range.
   * @param data The input data, which can be an Array, Array of Arrays, TypedArray, Buffer, ArrayBuffer, base64 string, or other container.
   * @param detectFloat If true, floating point values are converted to uint8 range (default: false).
   * @returns A Uint8Array representation of the input data, or null if conversion fails.
   */
  function u8(
    data: number[] | number[][] | TypedArray | Buffer | ArrayBuffer | string,
    detectFloat?: boolean
  ): Uint8Array | null;

  export = u8;
}

type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

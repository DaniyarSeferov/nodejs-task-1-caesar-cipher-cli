# Caesar cipher CLI tool

**Implements CLI tool that will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

CLI tool accepts 4 options (short alias and full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

## Details:

**Basic Scope**

1. `Action` (**encode**/**decode**) and the `shift` are required, if one of them missed - an error will be shown.
2. If the input file is missed - uses `stdin` as an input source.
3. If the output file is missed - uses `stdout` as an output destination.
4. If the input and/or output file is given but doesn't exist or you can't read it (e.g. because of permissions or it is a directory) - **human-friendly** error will be printed in `stderr`.
5. If passed params are fine the output (file or `stdout`) will contain encoded/decoded content of input (file or `stdin`).
6. For encoding/decoding **use only the English alphabet**, all other characters will be kept untouched.

**Usage example:**
1. _-a (--action)_ is **encode**

```bash
$ node caesar-cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```
> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ node caesar-cli --action encode --shift 7 --input plain.txt --output encoded.txt
```
> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

2. _-a (--action)_ is **decode**  
   _Decoding encoded initial string with the same -s(--shift) number produces the initial string._

```bash
$ node caesar-cli --action decode --shift 7 --input encoded.txt --output plain.txt
```

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> plain.txt
> `This is secret. Message about "_" symbol!`

3. _(Optional) Negative shift handling_

```bash
$ node caesar-cli --action encode --shift -1 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!`
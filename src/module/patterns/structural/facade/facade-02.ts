// These are some of the classes of a complex 3rd-party video
// conversion framework. We don't control that code, therefore
// can't simplify it.

class VideoFile {
  // ...
  constructor(filename: string) {}
}

class OggCompressionCodec {
  // ...
}

class MPEG4CompressionCodec {
  // ...
}

class CodecFactory {
  // ...

  extract(file: any): string {
    //...
    return '';
  }
}

class BitrateReader {
  // ...
  static read(filename: string, sourceCodec: string) {
    // ...
  }

  static convert(buffer: any, destinationCodec: string) {
    // ...
  }
}

class AudioMixer {
  // ...
  fix(result: any) {
    // ...
  }
}

// We create a facade class to hide the framework's complexity
// behind a simple interface. It's a trade-off between
// functionality and simplicity.
class VideoConverter {
  convert(filename: string, format: string): File {
    const file = new VideoFile(filename);
    const sourceCodec = new CodecFactory().extract(file);
    let destinationCodec: any;
    if (format == 'mp4') {
      destinationCodec = new MPEG4CompressionCodec();
    } else {
      destinationCodec = new OggCompressionCodec();
    }
    const buffer = BitrateReader.read(filename, sourceCodec);
    let result = BitrateReader.convert(buffer, destinationCodec);
    result = new AudioMixer().fix(result);
    return new File(result);
  }
}

// Application classes don't depend on a billion classes
// provided by the complex framework. Also, if you decide to
// switch frameworks, you only need to rewrite the facade class.
function main() {
  const convertor = new VideoConverter();
  const mp4 = convertor.convert('funny-cats-video.ogg', 'mp4');
  mp4.save();
}

export {};

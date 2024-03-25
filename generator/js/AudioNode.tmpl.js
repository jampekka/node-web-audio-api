const { throwSanitizedError } = require('./lib/errors.js');
const { kNapiObj } = require('./lib/symbols.js');

const { AudioParam, kNativeAudioParam } = require('./AudioParam.js');

class AudioNode extends EventTarget {
  constructor(context, napiObj) {
    super(napiObj);

    Object.defineProperty(this, 'context', {
      value: context,
      writable: false
    });

    this[kNapiObj] = napiObj;
  }

${d.attributes(d.node).filter(attr => d.name(attr) !== 'context').map(attr => {
return `
  get ${d.name(attr)}() {
    return this[kNapiObj].${d.name(attr)};
  }
`}).join('')}

${d.attributes(d.node).filter(attr => !attr.readonly).map(attr => {
return `
  set ${d.name(attr)}(value) {
    try {
      this[kNapiObj].${d.name(attr)} = value;
    } catch (err) {
      throwSanitizedError(err);
    }
  }
`}).join('')}

  // ------------------------------------------------------
  // connect / disconnect
  // ------------------------------------------------------

  // @todo
  // AudioNode connect (AudioNode destinationNode,
  //                    optional unsigned long output = 0,
  //                    optional unsigned long input = 0);
  // undefined connect (AudioParam destinationParam, optional unsigned long output = 0);

  connect(...args) {
    const jsDest = args[0];

    // note that audio listener params are not wrapped
    if (args[0] instanceof AudioParam) {
      args[0] = args[0][kNativeAudioParam];
    }

    if (args[0] instanceof AudioNode) {
      args[0] = args[0][kNapiObj];
    }

    try {
      this[kNapiObj].connect(...args);
      return jsDest;
    } catch (err) {
      throwSanitizedError(err);
    }
  }

  // @todo
  // undefined disconnect ();
  // undefined disconnect (unsigned long output);
  // undefined disconnect (AudioNode destinationNode);
  // undefined disconnect (AudioNode destinationNode, unsigned long output);
  // undefined disconnect (AudioNode destinationNode,
  //                       unsigned long output,
  //                       unsigned long input);
  // undefined disconnect (AudioParam destinationParam);
  // undefined disconnect (AudioParam destinationParam, unsigned long output);

  disconnect(...args) {
    if (args[0] instanceof AudioParam) {
      args[0] = args[0][kNativeAudioParam];
    }

    if (args[0] instanceof AudioNode) {
      args[0] = args[0][kNapiObj];
    }

    try {
      this[kNapiObj].disconnect(...args);
    } catch (err) {
      throwSanitizedError(err);
    }
  }

}

module.exports = AudioNode;

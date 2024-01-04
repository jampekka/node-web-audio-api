// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //
//                                                                            //
//                                                                            //
//                                                                            //
//    ██╗    ██╗ █████╗ ██████╗ ███╗   ██╗██╗███╗   ██╗ ██████╗               //
//    ██║    ██║██╔══██╗██╔══██╗████╗  ██║██║████╗  ██║██╔════╝               //
//    ██║ █╗ ██║███████║██████╔╝██╔██╗ ██║██║██╔██╗ ██║██║  ███╗              //
//    ██║███╗██║██╔══██║██╔══██╗██║╚██╗██║██║██║╚██╗██║██║   ██║              //
//    ╚███╔███╔╝██║  ██║██║  ██║██║ ╚████║██║██║ ╚████║╚██████╔╝              //
//     ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝               //
//                                                                            //
//                                                                            //
//    - This file has been generated ---------------------------              //
//                                                                            //
//                                                                            //
// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //

const { throwSanitizedError } = require('./lib/errors.js');

const { AudioParam } = require('./AudioParam.js');
const EventTargetMixin = require('./EventTarget.mixin.js');
const AudioNodeMixin = require('./AudioNode.mixin.js');
const AudioScheduledSourceNodeMixin = require('./AudioScheduledSourceNode.mixin.js');

module.exports = (NativeAudioBufferSourceNode) => {

  const EventTarget = EventTargetMixin(NativeAudioBufferSourceNode, ['ended']);
  const AudioNode = AudioNodeMixin(EventTarget);
  const AudioScheduledSourceNode = AudioScheduledSourceNodeMixin(AudioNode);

  class AudioBufferSourceNode extends AudioScheduledSourceNode {
    constructor(context, options) {
      super(context, options);
      // EventTargetMixin has been called so EventTargetMixin[kDispatchEvent] is
      // bound to this, then we can safely finalize event target initialization
      super.__initEventTarget__();

      this.playbackRate = new AudioParam(this.playbackRate);
      this.detune = new AudioParam(this.detune);
    }

    // getters

    get buffer() {
      return super.buffer;
    }

    get loop() {
      return super.loop;
    }

    get loopStart() {
      return super.loopStart;
    }

    get loopEnd() {
      return super.loopEnd;
    }

    // setters

    set buffer(value) {
      try {
        super.buffer = value;
      } catch (err) {
        throwSanitizedError(err);
      }
    }

    set loop(value) {
      try {
        super.loop = value;
      } catch (err) {
        throwSanitizedError(err);
      }
    }

    set loopStart(value) {
      try {
        super.loopStart = value;
      } catch (err) {
        throwSanitizedError(err);
      }
    }

    set loopEnd(value) {
      try {
        super.loopEnd = value;
      } catch (err) {
        throwSanitizedError(err);
      }
    }

    // methods
    
    start(...args) {
      try {
        return super.start(...args);
      } catch (err) {
        throwSanitizedError(err);
      }
    }

  }

  return AudioBufferSourceNode;
};


  
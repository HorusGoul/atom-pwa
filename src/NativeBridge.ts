const AtomNative = ((window as any).AtomNative = global.AtomNative || {
  getDebugMode: () => process.env.NODE_ENV !== "production",
  isHybrid: () => false
});

class NativeBridge {
  public isHybrid() {
    return AtomNative.isHybrid();
  }

  public getDebugMode() {
    return AtomNative.getDebugMode();
  }
}

export default new NativeBridge();

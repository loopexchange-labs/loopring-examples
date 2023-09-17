package com.loopringsdkmobile;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;


import loopringsdk.Loopringsdk;

public class LoopringModule extends ReactContextBaseJavaModule {
  LoopringModule(ReactApplicationContext context) {
    super(context);
  }

  @NonNull
  @Override
  public String getName() {
    return "LoopringModule";
  }

  @ReactMethod
  public void generateKeyPair(String signature, Promise promise) {
    try {
      final loopringsdk.KeyPair keyPair = Loopringsdk.generateKeyPair(signature);
      final WritableMap map = Arguments.createMap();

      map.putString("sk", keyPair.getSk());
      map.putString("x", keyPair.getX());
      map.putString("y", keyPair.getY());

      promise.resolve(map);
    } catch(Exception e) {
      promise.reject("generateKeyPair error", e);
    }
  }
}

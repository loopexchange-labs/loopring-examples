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
  public void fudgeyBenchmark(Promise promise) {
    try {
      final String signature = Loopringsdk.fudgeyBenchmark();

      promise.resolve(signature);
    } catch(Exception e) {
      promise.reject("fudgeyBenchmark error", e);
    }
  }

  @ReactMethod
  public void signRequest(String privateKey, String method, String baseUrl, String path, String data, Promise promise) {
    try {
      final String signature = Loopringsdk.signRequest(privateKey, method, baseUrl, path, data);

      promise.resolve(signature);
    } catch(Exception e) {
      promise.reject("signRequest error", e);
    }
  }
}

//
//  RCTLoopringModule.m
//  LoopringSdkMobile
//

#import "RCTLoopringModule.h"
#import "Loopringsdk/Loopringsdk.h"

@implementation RCTLoopringModule

RCT_EXPORT_METHOD(fudgeyBenchmark:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
 {
  NSError* error = nil;
  NSString *signature = LoopringsdkFudgeyBenchmark(&error);

  if (error != NULL) {
    reject(@"event_failure", @"could not generate signature", error);
  } else if (signature != NULL) {
    resolve(signature);
  } else {
    reject(@"event_failure", @"no signature returned", nil);
  }
 }

RCT_EXPORT_METHOD(signRequest:(NSString *)privateKey
                  method:(NSString *)method
                  baseUrl:(NSString *)baseUrl
                  path:(NSString *)path
                  data:(NSString *)data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
 {
  NSError* error = nil;
  NSString *signature = LoopringsdkSignRequest(privateKey,
                                               method,
                                               baseUrl,
                                               path,
                                               data,
                                               &error);

  if (error != NULL) {
    reject(@"event_failure", @"could not generate signature", error);
  } else if (signature != NULL) {
    resolve(signature);
  } else {
    reject(@"event_failure", @"no signature returned", nil);
  }
 }


RCT_EXPORT_MODULE(LoopringModule);

@end

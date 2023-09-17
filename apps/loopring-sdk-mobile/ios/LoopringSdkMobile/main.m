#import <UIKit/UIKit.h>

#import "AppDelegate.h"
#import "Loopringsdk/Loopringsdk.h"

int main(int argc, char *argv[])
{
  NSError* error = nil;
  NSString *message = LoopringsdkStuff(&error);

  if (error != NULL) {
    // Log the error
    NSLog(@"Error: %@", error);
  }

  if (message != NULL) {
    // Log the message
    NSLog(@"Message: %@", message);
  }

  @autoreleasepool {
    return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
  }
}

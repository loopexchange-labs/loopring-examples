package loopringsdk

import "C"
import "github.com/loopexchange-labs/go-loopring-sig/loopring"

//export Stuff
func Stuff() (string, error) {
	return loopring.SignRequest("0x123", "GET", "http", "asdf", "asdf")
}

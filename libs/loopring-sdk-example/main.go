package loopringsdk

import "C"
import (
	"fmt"
	"math/big"
	"strings"

	"github.com/loopexchange-labs/go-loopring-sig/loopring"
)

func SignRequest(privateKey string, method string, baseUrl string, path string, data string) (string, error) {
	pk := loopring.NewPrivateKeyFromString(privateKey)

	return loopring.SignRequest(pk, method, baseUrl, path, data)
}

func GenSigWithPadding(privateKey string, hash string) string {
	pk := loopring.NewPrivateKeyFromString(privateKey)

	messageToSign := new(big.Int)
	messageToSign.SetString(strings.TrimPrefix(hash, "0x"), 16)

	signature := pk.SignPoseidon(messageToSign)

	return "0x" +
		fmt.Sprintf("%064s", signature.R8.X.Text(16)) +
		fmt.Sprintf("%064s", signature.R8.Y.Text(16)) +
		fmt.Sprintf("%064s", signature.S.Text(16))
}

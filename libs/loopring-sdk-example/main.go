package loopringsdk

import "C"
import (
	"fmt"
	"math/big"

	"github.com/loopexchange-labs/go-loopring-sig/loopring"
	"github.com/loopexchange-labs/go-loopring-sig/poseidon"
	"github.com/loopexchange-labs/go-loopring-sig/utils"
)

// Modeled after https://github.com/fudgebucket27/PoseidonSharp/blob/master/PoseidonConsole/Program.cs
func FudgeyBenchmark() (string, error) {
	iterations := 1000
	pk := loopring.NewPrivateKeyFromString("0x4485ade3c570854e240c72e9a9162e629f8e30db4d8130856da31787e7400f0")

	var signedMessage string
	for i := 0; i < iterations; i++ {
		hash, err := poseidon.Hash([]*big.Int{
			utils.NewIntFromString("11111111111111111111111111111111111111111111111111111111111111111111111111"),
			utils.NewIntFromString("91111111111111111111111111111111111111111111111111111111111111111111111111"),
			utils.NewIntFromString("99111111111111111111111111111111111111111111111111111111111111111111111111"),
			utils.NewIntFromString("99911111111111111111111111111111111111111111111111111111111111111111111111"),
			utils.NewIntFromString("99991111111111111111111111111111111111111111111111111111111111111111111111"),
			utils.NewIntFromString("99999111111111111111111111111111111111111111111111111111111111111111111111"),
			utils.NewIntFromString("99999911111111111111111111111111111111111111111111111111111111111111111111"),
			utils.NewIntFromString("99999991111111111111111111111111111111111111111111111111111111111111111111"),
			utils.NewIntFromString("99999999111111111111111111111111111111111111111111111111111111111111111111"),
			utils.NewIntFromString("99999999911111111111111111111111111111111111111111111111111111111111111111"),
			utils.NewIntFromString("99999999991111111111111111111111111111111111111111111111111111111111111111"),
			utils.NewIntFromString("99999999999111111111111111111111111111111111111111111111111111111111111111"),
		})
		if err != nil {
			return "", err
		}

		sig := pk.SignPoseidon(hash)

		signedMessage = "0x" +
			fmt.Sprintf("%064s", sig.R8.X.Text(16)) +
			fmt.Sprintf("%064s", sig.R8.Y.Text(16)) +
			fmt.Sprintf("%064s", sig.S.Text(16))
	}

	return signedMessage, nil
}

// Example of signing loopring API requests
//
// example: "0x1234", "GET", "https://uat2.loopring.io", "/api/v3/resource", "accountId%3D10149"
func SignRequest(privateKey string, method string, baseUrl string, path string, data string) (string, error) {
	return loopring.SignRequest(
		loopring.NewPrivateKeyFromString(privateKey),
		method,
		baseUrl,
		path,
		data,
	)
}

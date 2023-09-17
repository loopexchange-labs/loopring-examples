package loopringsdk

import "C"
import (
	"github.com/loopexchange-labs/go-loopring-sig/loopring"
)

type KeyPair struct {
	Sk string
	X  string
	Y  string
}

func GenerateKeyPair(signature string) *KeyPair {
	keyPair := loopring.GenerateKeyPair(signature)

	return &KeyPair{
		Sk: keyPair.FormatSecretKey(),
		X:  keyPair.FormatPublicKeyX(),
		Y:  keyPair.FormatPublicKeyY(),
	}
}

func SignRequest(privateKey string, method string, baseUrl string, path string, data string) (string, error) {
	return loopring.SignRequest(privateKey, method, baseUrl, path, data)
}

func GetEddsaSigNftOrder(
	privateKey string,
	exchangeAddress string,
	storageId string,
	accountId string,
	sellTokenId string,
	buyTokenId string,
	sellTokenAmount string,
	buyTokenAmount string,
	validUntil string,
	maxFeeBips string,
	fillAmountBOrS string,
	takerAddress string,
) (string, error) {
	return loopring.GetEddsaSigNftOrder(
		privateKey,
		exchangeAddress,
		storageId,
		accountId,
		sellTokenId,
		buyTokenId,
		sellTokenAmount,
		buyTokenAmount,
		validUntil,
		maxFeeBips,
		fillAmountBOrS,
		takerAddress,
	)
}

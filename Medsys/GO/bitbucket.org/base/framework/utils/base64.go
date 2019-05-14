package utils

import (
	"crypto/rand"
	"encoding/base64"
	"io"
)

const (
	// Size16 constant for size of 16
	Size16 BufferSize = 16
	// Size32 constant for size of 32
	Size32 BufferSize = 32
	// Size64 constant for size of 64
	Size64 BufferSize = 64
)

// BufferSize type of base64 size
type BufferSize rune

// NewRandom function will generate a random Base64 string
func NewRandom(size BufferSize) string {
	b := make([]byte, size)
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		return ""
	}
	return base64.URLEncoding.EncodeToString(b)
}

package utils

// Prepend used for append items at begining of array
func Prepend(src []interface{}, items ...interface{}) []interface{} {
	var newArray []interface{}

	newArray = append(newArray, items...)

	return append(newArray, src...)
}

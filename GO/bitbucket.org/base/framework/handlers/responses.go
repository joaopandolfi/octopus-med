package handlers

// Response interface is used to intercept http response
/* type Response interface {
	// SetCode without body or response
	SetCode(code rune)
	// Success method return 200 code on response
	Success(body interface{})
	// InternalServerError method return 500 code on response and a default error
	InternalServerError(body interface{})
	// BadRequest method return 400 on response and return default error
	BadRequest(body interface{})
} */

// Response struct is used to intercept http response
type Response struct {
	body interface{}
	code int
}

// Error type was create to help handlers with handling errors
type Error struct {
	Message string
}

// SetCode without body or response
func (dr *Response) SetCode(code int) {
	dr.code = code
}

// Success method return 200 code on response
func (dr *Response) Success(body interface{}) {
	dr.code = 200
	dr.body = body
}

// InternalServerError method return 500 code on response and a default error
func (dr *Response) InternalServerError(body interface{}) {
	dr.code = 500
	dr.body = body
}

// BadRequest method return 400 on response and return default error
func (dr *Response) BadRequest(body interface{}) {
	dr.code = 400
	dr.body = body
}

// BadRequest method return 400 on response and return default error
func (dr *Response) LoginError() {
	dr.code = 404
	dr.body = map[string]string{"success": "false", "msg": "Auth Error"}
}

package userdto

type UserRequest struct {
	NIK     int64  `json:"nik"`
	Name    string `json:"name"`
	Gender  string `json:"gender"`
	DOB     string `json:"dob"`
	Address string `json:"address"`
	Country string `json:"country"`
}

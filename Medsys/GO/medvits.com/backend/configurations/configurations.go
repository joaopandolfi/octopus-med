package configurations

import (
	"os"
)

// MySQL Dev
var DB_DSN = os.Getenv("SQL_DSN")

type Configurations struct {
}

type PNConfigurations struct {
	FirebaseUrl  string
	FirebaseJson string
}

var Configuration Configurations

// Load all configuration from environment variables
func Load() {
	Configuration = Configurations{}
}

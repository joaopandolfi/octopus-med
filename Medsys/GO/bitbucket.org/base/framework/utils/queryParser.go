package utils

import (
	"net/url"
	"regexp"
)

type QueryParser interface {
	ParseToSQL(*url.Values) string
}

type UtilsQueryParser struct {
}

func (cc UtilsQueryParser) ParseToSQL(params *url.Values) (sql string) {

	par := *params
	reSplit := regexp.MustCompile("[$]")
	arrSplit := regexp.MustCompile("[,]")

	var connectors []string
	parts := make(map[string]string)
	finalSql := ""

	//Recupera cada Key e processa
	for k, v := range par {
		//Verifica se e um filter
		if len(k) > 7 {
			if k[0:6] == "filter" {
				key := k[7 : len(k)-1]

				comparator := "=" // Equal is default
				operator := "AND" // AND is default
				splitedKey := reSplit.Split(key, -1)
				splitedVal := arrSplit.Split(v[0], -1)

				//Checa se esta falando da regra
				if splitedKey[0] == "role" {
					connectors = splitedVal
					continue
				}
				//Se possui subcomando -> teste$lt
				if len(splitedKey) > 1 {
					//Interpreta o comando
					comparator = getSqlComparator(splitedKey[1])
					if len(splitedKey) == 3 {
						operator = getSqlOperator(splitedKey[2])
					}
				}

				//Monta cada clausula
				sql := ""
				tam := len(splitedVal) - 1
				for i, val := range splitedVal {
					sql += splitedKey[0] + " " + comparator + " '" + val + "' "
					if tam > 1 && i < tam {
						sql += " " + operator + " "
					}
				}

				//parts = append(parts, sql)
				parts[splitedKey[0]] = sql
			}
		}

	}

	//Monta SQL FINAL
	if len(connectors) > 0 {
		for _, key := range connectors {
			op := getSqlOperator(key)
			//Nao e operador
			if op == "" {
				finalSql += "(" + parts[key] + ")"
			} else {
				finalSql += op
			}
		}
	} else {
		tam := len(parts) - 1
		i := 0
		for _, part := range parts {
			finalSql += part
			if tam > 1 && i < tam {
				finalSql += " AND "
			}
			i += 1
		}
	}

	return finalSql
}

func getSqlComparator(command string) (comparator string) {
	switch command {

	case "ne": // !=
		comparator = "<>"
		break

	case "gt": // >
		comparator = ">"
		break

	case "lt": // <
		comparator = "<"
		break

	case "ge": // >=
		comparator = "<="
		break

	case "le": // <=
		comparator = ">="
		break

	default:
	case "eq": // ==
		comparator = "="
		break
	}

	return
}

func getSqlOperator(command string) (operator string) {
	switch command {
	case "and":
		operator = " AND "
		break
	case "or":
		operator = " OR "
		break
	default:
		operator = ""
	}
	return
}

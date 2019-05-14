package utils

import (
	"fmt"
	"log"
	"net/url"
	"regexp"
	"testing"
)

func TestUtilsQueryParser_ParseToSQL(t *testing.T) {
	u, err := url.Parse("https://example.org/?filter[data]=22/05/2005&filter[idade$eq$or]=1,2,3&filter[nome$ne]=joao&filter[batata$gt]=frita&filter[role]=nome,or,data,and,batata,or,idade")
	if err != nil {
		log.Fatal(err)
	}
	q := u.Query()
	reSplit := regexp.MustCompile("[$]")
	arrSplit := regexp.MustCompile("[,]")

	parts := make(map[string]string)
	var connectors []string
	finalSql := ""

	//t := reflect.ValueOf(result).Elem()
	for k, v := range q {
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

	fmt.Println(finalSql)
	fmt.Println(q["a"])
	fmt.Println(q.Get("b"))
	fmt.Println(q.Get(""))
	fmt.Println(q.Get("batata[1]"))
	fmt.Println(q.Get("filter"))
	//fmt.Println(json.(q))
}

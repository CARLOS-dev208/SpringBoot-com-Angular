package io.github.carlos.util;

import java.math.BigDecimal;

import org.springframework.stereotype.Component;

@Component
public class ConverterParaBigDecimal {

	public BigDecimal converter(String value) {
		if(value ==null) {
				return null;
		}
		value = value.replace(".", "").replace(",",".");			
		return new BigDecimal(value);
	}
}

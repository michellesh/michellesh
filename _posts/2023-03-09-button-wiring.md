---
title: Wiring a button with 2 or 4 pins on an ESP32
last-updated: 2023-03-09
images:
  button-wiring-schematic: /assets/images/posts/button-wiring-schematic.jpg
  button-wiring-soldered: /assets/images/posts/button-wiring-soldered.jpg
---

How I wire a button with either 2 or 4 pins with ESP32 boards.

### Parts

- [**2-pin Button**](https://www.amazon.com/dp/B07F24Y1TB?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=0fcf972b910c7b144adaf37d61038e59&camp=1789&creative=9325){:target="blank"}
- 4-pin Button
- [**ESP32**](https://www.amazon.com/dp/B07Q576VWZ?ref=ppx_yo2ov_dt_b_product_details&amp;th=1&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=9e4a70cf7b4bbf0c998b1df4f3103ac0&camp=1789&creative=9325){:target="blank"}


### Schematic

This example uses the D25 pin to power the button, but you can also use the 3.3V pin instead.

![Button wiring schematic]({{ page.images.button-wiring-schematic | relative_url }}){:class="fit-image"}


### Wiring

![Button wiring soldered]({{ page.images.button-wiring-soldered | relative_url }}){:class="fit-image"}


### Code

If powering the button with the 3.3V pin, omit the lines referencing `BUTTON_PIN_POWER`

```cpp
#define BUTTON_PIN_POWER 25
#define BUTTON_PIN_DATA 27 // omit if using 3.3V pin

void setup() {
  Serial.begin(115200);
  delay(100);

  pinMode(BUTTON_PIN_POWER, OUTPUT);
  pinMode(BUTTON_PIN_DATA, INPUT);
}

void loop() {
  digitalWrite(BUTTON_PIN_POWER, HIGH);

  int buttonRead = digitalRead(BUTTON_PIN_DATA); // HIGH when button held

  if (buttonRead == HIGH) {
    Serial.println("ON");
  } else {
    Serial.println("OFF");
  }

  delay(100);
}
```

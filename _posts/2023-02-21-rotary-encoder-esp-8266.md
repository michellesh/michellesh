---
title: Rotary encoder with ESP8266 wiring and code
last-updated: 2023-02-21
---

How I wire a rotary encoder with an ESP8266 and basic code to read the rotation angle and the button press.

### Parts
- [ESP8266](https://www.amazon.com/gp/product/B081CSJV2V/ref=ppx_yo_dt_b_search_asin_title?&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=0a102a013ba2bb4963f88cfc981c6f0a&camp=1789&creative=9325){:target="blank"}
- [Rotary encoder](https://www.amazon.com/gp/product/B07T3672VK/ref=ppx_yo_dt_b_search_asin_title?&_encoding=UTF8&tag=ladyoflightio-20&linkCode=ur2&linkId=a125662fd15acab600cbae6c01fb5a10&camp=1789&creative=9325){:target="blank"}


### Code

```cpp
#define ENCODER_CLK 5 // D1
#define ENCODER_DT 4  // D2
#define ENCODER_SW 0  // D3
#define MAX_CLICKS 40

int clicks = 0;
int currentCLK;
int prevCLK;
int currentSW = 0;
int prevSW = 0;

void setup() {
  Serial.begin(9600);

  pinMode(ENCODER_CLK, INPUT);
  pinMode(ENCODER_DT, INPUT);
  pinMode(ENCODER_SW, INPUT);

  // Read the initial state
  prevCLK = digitalRead(ENCODER_CLK);
  prevSW = digitalRead(ENCODER_SW);
}

void loop() {
  // Read the current state
  currentCLK = digitalRead(ENCODER_CLK);
  currentSW = digitalRead(ENCODER_SW);

  if (currentSW == LOW && prevSW == HIGH) {
    Serial.println("Button pressed!");
  }

  // A pulse occurs if the previous and the current state differ
  if (currentCLK != prevCLK) {
    if (digitalRead(ENCODER_DT) != currentCLK) {
      clicks++;
      if (clicks >= MAX_CLICKS) {
        clicks = 0;
      }
    } else {
      clicks--;
      if (clicks < 0) {
        clicks = MAX_CLICKS;
      }
    }

    // Print the rotation angle, a value from 0-360 degrees
    Serial.println(map(clicks, 0, MAX_CLICKS, 0, 360));
  }

  prevCLK = currentCLK;
  prevSW = currentSW;
}
```

Sources used: [geekering.com article](https://www.geekering.com/categories/embedded-sytems/esp8266/joaotarquinio/how-to-use-rotary-encoders-with-esp8266/){:target="blank"}

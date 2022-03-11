---
name: Betsy
project-id: betsy
year: 2019
github: https://github.com/michellesh/led-ceiling
image-dir: /assets/images/betsy/
images-column-1:
  -
    filename: betsy.gif
    title: Glittering in the wind
  -
    filename: ibex.jpg
    title: Betsy in Ibex, UT
  -
    filename: first-time-turning-it-on.jpg
    title: First time turning on the LEDs
  -
    filename: soldering-done.jpg
    title: Celebrating on the day we finished soldering
images-column-2:
  -
    filename: betsy-illuminate-2020.jpg
    title: Illuminate 2020, Salt Lake City, UT
  -
    filename: cozy-dome.jpg
    title: Betsy in a cozy geodesic dome
  -
    filename: betsy-illuminate-2020-2.jpg
    title: Illuminate 2020, Salt Lake City, UT
  -
    filename: hot-glueing.jpg
    title: Hot gluing the LEDs to the fabric
---

The Playa Canopée, aka. "Betsy", is a ceiling of lights, under which one can cozy up on a bouncy chair and gaze up at the relaxing ebb and flow of lights. All ~650 LEDs are hand-soldered and controlled by custom code running on an Arduino. All the fabric components were lovingly sewn by [caprockthreadworks](https://www.instagram.com/caprockthreadworks/). Betsy first appeared at Burning Man 2019 at Camp Armageddon and has made an appearance at several other events since. This project was built as a part of [Salt Mind](https://www.instagram.com/saltmindslc/), an amazing group of humans.

<div class='column-container'>
  <div class='column'>
    {% for image in page.images-column-1 %}
      {% assign filename = page.image-dir | append: image.filename %}
      <img
        class="fit-image column-img"
        title="{{ image.title }}"
        src="{{ filename | relative_url }}"
      />
    {% endfor %}
  </div>
  <div class='column'>
    {% for image in page.images-column-2 %}
      {% assign filename = page.image-dir | append: image.filename %}
      <img
        class="fit-image column-img"
        title="{{ image.title }}"
        src="{{ filename | relative_url }}"
      />
    {% endfor %}
  </div>
</div>

---
title: Hello!
---


<style>
.about-me-img {
  margin-top: 2.5em;
}
</style>


<div class="column-container">
  <div class="p column" style="flex: 1.5; padding-right: 2em;">

    {% include handwritten-header.html url="/assets/images/headers/hello.png" %}

    <p>
      I'm Michelle! People also call me Micky.
    </p>
    <p>
      I'm a software engineer pursuing creativity. Currently I'm learning about LEDs and posting about it here. I love code and art and combining them. I also like drawing diagrams and soldering.
    </p>
    <p>
      Check out some of the <a href="/installations">installations</a> I've worked on, or some of my smaller-scale <a href="/projects">projects</a>!
    </p>
  </div>
  <div class="p column" style="flex: 1;">
    <img
      class="about-me-img fit-image card-shadow"
      src="{{ '/assets/images/about-me.jpeg' | relative_url }}"
    />
  </div>
</div>

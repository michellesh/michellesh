---
title: Hello!
---


<style>
.about-me-img {
  width: 84%;
  margin-top: 2.5em;
}
.right-aligned {
  text-align: right;
}
</style>


<div class="column-container">
  <div class="p column">

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
  <div class="p column">
    <div class="right-aligned">
      <img class="about-me-img card-shadow" src="{{ '/assets/images/about-me.jpeg' | relative_url }}" />
    </div>
  </div>
</div>

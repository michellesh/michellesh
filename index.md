---
title: Hello!
---


<style>
.button-container {
  text-align: center;
  margin-top: 3rem;
}
.button-container button {
  cursor: pointer;
  text-transform: lowercase;
}
.overlay h3 {
  margin: 0;
  color: #fff;
}

.img-overlay-container {
  position: relative;
  display: inline-block;

  opacity: 0; /* Hidden by default */
  transition: opacity 2s ease; /* Smooth fade-in */
}
.img-overlay-container img {
  display: block;
  width: 100%;
  height: auto;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  pointer-events: none;
}
</style>


<h2>Recent Installations</h2>

{% assign installation = site.installations | sort: "year" | last %}


{% if installation.main-image %}
  {% assign filename = installation.image-dir | append: installation.main-image %}
  <div class="img-overlay-container">
    <a href="{{ installation.url | relative_url }}">
      <img
        onload="this.parentNode.parentNode.style.opacity=1"
        src="{{ filename | relative_url }}"
      />
      <div class="overlay">
        <h3>{{ installation.name }}</h3>
      </div>
    </a>
  </div>
{% endif %}

<div class="button-container">
  <a href="/installations">
    <button>All Installations</button>
  </a>
</div>


{% assign project = site.projects | where_exp: 'project', 'project.hidden != true' | last %}

<h2>Recent Projects</h2>

{% if project.main-image-url %}
  <div class="img-overlay-container">
    <a href="{{ project.url | relative_url }}">
      <img
        onload="this.parentNode.parentNode.style.opacity=1"
        src="{{ project.main-image-url | relative_url }}"
      />
      <div class="overlay">
        <h3>{{ project.title }}</h3>
      </div>
    </a>
  </div>
{% endif %}

<div class="button-container">
  <a href="/projects">
    <button>All Projects</button>
  </a>
</div>

<br/>
<br/>
<br/>


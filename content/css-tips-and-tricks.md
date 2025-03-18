+++
title = '5 CSS Tips and Tricks Every Web Developer Should Know'
date = 2023-11-22T16:55:24+01:00
draft = false
description = "Most underrated CSS properties that will help you to improve design skills and some useful CSS tricks to speed up coding session."
image = "https://blog.lama.dev/images/css-tips-big.png"
imageBig = "https://blog.lama.dev/images/css-tips-big.png"
categories = ["css", "style", "UX Design"]
authors = ["MK Kumawat"]
avatar = "/images/mk1.png"
+++

Let’s explore some essential CSS tips and tricks that will help you streamline your web design process and build stunning, creative websites.

## CSS Clip-Path
 
Clip path allows you to create custom shapes by clipping the visible area of an HTML element. You can think of it as a virtual pair of scissors that allows you to cut and reshape your items. By manipulating this property, you can create various shapes and effects that go beyond the typical rectangles and squares.


```css
/* Let's create a circle */
.circular-element {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  clip-path: circle(50% at 50% 50%);
}
```
```css
/*Or a hexagon*/
.hexagon-element {
  width: 100px;
  height: 100px;
  background-color: #e74c3c;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
```

Creating shapes solely through coding can be challenging. Therefore, you can simplify the process by using a “clip-path generator” tool available online. With this tool, you can draw your desired shapes interactively on a canvas and easily copy the generated code to paste it into your CSS file. (Here is my recommendation.)

## CSS Aspect Ratio
Aspect ration is the proportional relationship between the width and height. By defining the aspect ratio of an element, you ensure that it adapts gracefully to various screen sizes and orientations. This is particularly important for images, videos, and containers that house dynamic content.

```css
.video-container {
  width:1920px;
  height:1080px
}
```
There’s nothing inherently wrong with this video player, but the real challenge arises when ensuring its responsiveness across various screen sizes. Writing code to maintain the same proportions for every responsive breakpoint can be quite cumbersome. However, a solution to this challenge is to leverage the aspect-ratio property.

```css
.video-container {
 width:100%
 aspect-ratio: 16/9;
}
```
## CSS Filters
CSS filters are a set of properties that allow you to apply various graphical effects to HTML elements. These effects alter the rendering of an element’s content and are commonly used for images but can be applied to any HTML content.

```css
.my-element {
  filter: blur(5px) grayscale(50%);
}
```

Here are some of the most commonly used CSS filters and how they can transform your web design:

{{< highlight class="text-highlight-glow" >}}glowing highlighted text{{< /highlight >}}

   {{< highlight class="text-highlight-glow" >}}Blur:{{< /highlight >}}The blur filter adds a Gaussian blur to an element, creating a soft and dreamy effect. It’s perfect for creating focus on a specific part of an image or for adding an artistic touch to your design.

{{< highlight class="text-highlight-glow" >}}Grayscale:{{< /highlight >}} With the grayscale filter, you can turn colorful elements into black and white, giving your design a classic and timeless look. This filter is great for creating a vintage vibe.

{{< highlight class="text-highlight-glow" >}}Brightness and Contrast:{{< /highlight >}}  Adjusting the brightness and contrast filters can make your elements pop or create a subtle, muted appearance. These filters are excellent for fine-tuning the visual balance of your design.

 {{< highlight class="text-highlight-glow" >}}Hue Rotate:{{< /highlight >}} The hue-rotate filter allows you to change the color tone of an element, making it easy to create visually stunning effects and color variations.

{{< highlight class="text-highlight-glow" >}}Invert:{{< /highlight >}} The invert filter flips the colors of an element, making it look like a photographic negative. This can be a captivating and unexpected addition to your web design.

{{< highlight class="text-highlight-glow" >}}Saturate and Sepia:{{< /highlight >}} The saturate filter intensifies or desaturates colors, while the sepia filter gives your elements a nostalgic, sepia-toned look. Both are fantastic tools for adding character and mood to your design.

## The :where() Pseudo-Class*
This class allows you to select elements that match any of the given selectors within its parentheses. This feature is especially helpful when you want to apply the same styles to multiple similar elements without writing separate rules for each selector.

```css
/* Without :where() */
div.container h2,
div.container h3,
div.container h4 {
  font-weight: bold;
}


/* With :where() */
:where(h2, h3, h4) {
  font-weight: bold;
}
```
## Styling Video Captions
Did you know you can give a style for video captions?

Before styling, let me show you how to add a caption for a video in HTML.
```css
  <video src="video.mp4" controls>
      <track kind="captions" label="En" src="/captions.vtt" />
  </video>
  ```
As you can see, adding a caption in HTML is quite straightforward. Simply create your caption file in .vtt format and then include it using the track HTML element.

Now using ::cue pseudo-element, you change your text and font style.

```css
::cue {
  font-size: 50px;
}
```
Thanks for taking the time to read this article. If you found it helpful, don’t forget to check out the video on my YouTube channel for even more insights. See you next week for another exciting update
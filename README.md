# prettyguidedtour
a simple, but beautiful guided tour

Simply add PrettyGuidedTour to your website, definde parameters such as color and font, and provide the IDs of the elements you want to showcase as well as a description text.

![Pretty Guided Tour Exmaple](https://github.com/Tobystereo/prettyguidedtour/raw/main/PrettyGuidedTour_GIF.gif)

## Usage Parameters

add 'prettyguidedtour.js' to your webpage as well as a parameter definition:
```
<script type="text/javascript">
// User defined parameters for Pretty Guided Tour

var onboardingMaskColor = "rgba(193, 128, 210, .35)";
var onboardingFontFamily = "Proxima Nova";
var onboardingPopupWidth = 400;
var onboardingPopupGap = 24;
var onboardingIntro = {
  title: "Organize your data in workspaces",
  description: "Workspaces are APP's collaborative project areas. Add references to datasets and documents that you need for your project.<br><br>Document with comments, tags, and the description field so that your work is more discoverable and you can easily distinguish between related projects.",
  buttonText: "Get started"
}
var onboardingHighlights = [
  {
	id:"test1",
	title: "Area number 1",
	description: "Porttitor aliquam ante adipiscing semper nostra orci proin vehicula cursus, auctor conubia suscipit sagittis magna venenatis quis netus hendrerit duis, curae commodo integer lacinia eu mus hac morbi."
  }, 
  {
	id: "test2",
	title: "Area number 2",
	description: "Porttitor aliquam ante adipiscing semper nostra orci proin vehicula cursus, auctor conubia suscipit sagittis magna venenatis quis netus hendrerit duis, curae commodo integer lacinia eu mus hac morbi. Porttitor aliquam ante adipiscing semper nostra orci proin vehicula cursus, auctor conubia suscipit sagittis magna venenatis quis netus hendrerit duis, curae commodo integer lacinia eu mus hac morbi."
  }, 
  {
	id: "test3",
	title: "Capture knowledge and give a voice to your data",
	description: "Any user can comment on a Workspace or reply to existing comments<br><br>Users subscribed to the Workspace will receive a notification for new comments and replies."
  }
];
</script>
<script src="https://www.oratio.co/wp-content/plugins/prettyguidedtour.js"></script>
```

## Get involved
To contribute, check out the project, and see what needs to be done in the [dev project](https://github.com/Tobystereo/prettyguidedtour/projects/1).

For questions, reach out to [me](mailto:hello@treppmann.design)

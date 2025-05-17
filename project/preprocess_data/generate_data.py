from openai import OpenAI
import os
import requests

client = OpenAI()  

# Dumbs down the story
def simplifyStory(story_title: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
            {"role": "system", "content": "Rewrite this Bible story for a 5-year-old in 3 sentences. Use simple words and happy tone."},
            {"role": "user", "content": "Original story: " + story_title}
        ]
    )
    return response.choices[0].message.content

# Returns 6 prompts for panel generation
def splitInPrompts(simplified_story: str) -> list[str]:
    response = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
        {"role": "system", "content": "Split this kid-friendly story into 6 DALL·E 3 prompts. Focus on colorful cartoon scenes. Be consistent with the characters used and with the style used."},
        {"role": "user", "content": simplified_story}
        ]
    )
    return response.choices[0].message.content  # Returns 6 prompts

def getPanels(prompts : list[str]) -> list[str]:
    images_urls = [None * len(prompts)]

    for i in range(len(prompts)):
        image_response = client.images.generate(
            model="dall-e-3",
            prompt="Panel 1: [first prompt from panel_prompts]",
            size="1024x1024",
            quality="standard",
            n=1,
        )
        images_urls[i] = image_response.data[0].url
    
    return images_urls

def main():
    stories = ["The Good Samaritan", "The Prodigal Son", "David and Goliath", "Noah's Ark", "The Creation Story", "The Birth of Jesus", "The Last Supper", "The Resurrection of Jesus"]
    for story in stories:
        # Make directory for story
        os.makedirs(f"Bible_Stories/{story}/images", exist_ok=True)

        # Simplify story and store it
        simplified_story = simplifyStory(story)
        open(f"Bible_Stories/{story}/simplified_story.txt", 'w').write(simplified_story)

        # Generate panels
        panel_prompts = splitInPrompts(simplified_story)
        panels_urls = getPanels(panel_prompts)

        # Save the images URLs to a file or database
        for i in range(len(panels_urls)):
            panel = requests.get(panels_urls[i]).content
            open(f"Bible_Stories/{story}/images/panel_{i}", "wb").write(panel)

main()

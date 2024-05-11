import pymongo
from pymongo import MongoClient
from bson import ObjectId  

client = MongoClient("mongodb+srv://instajob:80z93toSszx6yIlt@cluster0.csynum6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

# Get the database object
db = getattr(client, "instajob", None)

# Check if the database connection was successful
if db is not None:
    print("Database connection successful!")

    # Get the 'videointerviews' collection
    collection = db['videointerviews']

    # Find the document with the correct _id
    video_id = 'PASTE ID HERE'
    doc = collection.find_one({"_id": ObjectId(video_id)})  

    if doc is not None:
        print("Document found!")

        # Get the video data
        video_data = doc['video']

        # Open the file in binary mode with a specific file name
        with open("downloaded_video.mp4", "wb") as f:
            f.write(video_data)  # Write the video data directly to the file

        # Now you have the video file saved as "downloaded_video.mp4" in the current directory
        print("Video downloaded successfully!")
    else:
        print("Document not found!")
else:
    print("Database connection failed!")

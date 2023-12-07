# TODO

Figure out how to manage uploading new images, deleting old images that were marked for deletion, and keeping old images that were not marked for deletion:
  - images marked for deletion should be removed from s3 bucket, and removed from imageUrls in entity
  - images not marked for deletion should be included in imageUrls in entity
  - new images to upload is probably already working as intended, just make sure not to break it when doing the above
Finish uploading my old projects
from fastapi import FastAPI, HTTPException, Depends
# from typing import Annotated
from google.cloud import bigquery
from pydantic import BaseModel
# import models
from zipfile import ZipFile
import os
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)
class DescribeImage(BaseModel):
    image_name : str
    description: str

# client = bigquery.Client()

# Define your dataset and table IDs
dataset_id = 'your_dataset_id'
table_id = 'your_table_id'


@app.post("/save-data")
async def save_data_to_bigquery(image_name:str, description:str):
    data = {
        image_name: "image_name", 
        description: "description"
    }
    return data
    # table = client.get_table(f"{client.project}.{dataset_id}.{table_id}")
    # rows_to_insert = [(data['column1'], data['column2'])]  # Adjust columns as needed
   
    # errors = client.insert_rows(table, rows_to_insert)
    # if errors:
    #     return {"success": False, "errors": errors}
    # else:
    #     return {"success": True}

@app.post("/get-data-src")
async def get_data_from_src(file_path:str):
    if file_path == '':
        return []
    
    else:
        zipDirectory = "/Users/enkay/Documents/FordMotors/image-caption/ReactJS/image-caption/public/images" 
        
        if os.path.exists(zipDirectory) == False:    
            print('creating folder')
            Path(zipDirectory).mkdir(parents=True, exist_ok=True)
            # file_path = str.split(':')[1]
            with ZipFile(file_path, 'r') as zObject: 
                zObject.extractall(zipDirectory)
        else:
            print('Folder is already present')
            
        image_path = []
        
        for filename in os.scandir(zipDirectory):
            if filename.name.endswith('.png') or filename.name.endswith('.jpg') or filename.name.endswith('.JPG') :
                path = {}
                path['og_path'] = filename.path
                path['img_path'] = filename.path.split('/')[-2] + '/' + filename.path.split('/')[-1]
                path['desc'] = ''
                image_path.append(path)
        print(image_path)
        json_compatible_item_data = jsonable_encoder(image_path)
        return JSONResponse(content=json_compatible_item_data)
        # return {image_path}

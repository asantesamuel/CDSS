# How to run

- Clone branch with the command "``` git clone --branch flask --single-branch https://github.com/asantesamuel/CDSS.git ```"
- Use the command "``` cd CDSS ```" to enter project directory
- Use the command "``` py 3.10 -m venv myvenv ```" to create a virtual environment, make sure you have python version 3.10
- Run the command "``` .\myvenv\Scripts\Activate ```" to activate the virtual environment
- Run the command "``` pip install -r requirements.txt```" to install required dependencies in the virtual environment
- Run the command "``` python app.py ```" to run the backend server
- Import the final_stroke_segmentation_model2.pth file and dicom_classifier_best_20250728_140953.h5 file into the root directory, ie ```CDSS/```. These files can be found in the ```models``` folder
- Finally you can run the frontend and node backend to use the app
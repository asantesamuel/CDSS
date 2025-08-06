# How to run

- Clone branch with the command "``` git clone --branch flask --single-branch https://github.com/asantesamuel/CDSS.git ```"
- Use the command "``` cd CDSS ```" to enter project directory
- Use the command "``` python -m venv myvenv ```" to create a virtual environment
- Run the command "``` .\myvenv\Scripts\Activate ```" to activate the virtual environment
- Run the command "``` pip install requirements.txt```" to install required dependencies in the virtual environment
- Run the command "``` python app.py ```" to run the backend server
- Import the .h5 file in the root directory, ie ```CDSS/``` and mae sure it is named ```dicom_classifier_best_20250728_140953.h5```
- Finally you can use the frontend to communicate with the APIs
from flask import Flask, render_template, url_for, request, jsonify
from text_sentiment_prediction import *

# pip install flask

app = Flask(__name__)

@app.route('/')
def index():
    entries = show_entry()
    return render_template('index.html', entries=entries)
 
@app.route('/predict-emotion', methods=["POST"])
def predict_emotion():
    
    # Obtenha a entrada de texto do requisição POST 
    input_text = request.json.get("text")
    
    if not input_text:
        response = {
            "status": "error",
            "message": "O texto precisa ser digitado"
        }
        return jsonify(response)
        # Resposta a enviar se o input_text for indefinido
    else:
        predicted_emotion,predicted_emoji = predict(input_text)
    
        # Resposta a enviar se o input_text não for indefinido
        response = {
            "status": "success",
            "data": {
                "predicted_emotion": predicted_emotion,
                "predicted_emoji": predicted_emoji     
                }
        }
        # Enviar resposta   
        return jsonify(response)    


# Salve a entrada
@app.route("/save-entry", methods=["POST"])
def save_entry():

    # Obtenha a data, a emoção prevista e o texto digitado pelo usuário para salvar a entrada
    date = request.json.get("date")           
    emotion = request.json.get("emotion")
    save_text = request.json.get("text")

    save_text = save_text.replace("\n", " ")

    # Entrada CSV
    entry = f'{date},{save_text},{emotion}\n'  

    with open("./static/assets/data_files/data_entry.csv", "a") as f:
        f.write(entry)
    return jsonify("Success")  
        
       
app.run(debug=True)



    
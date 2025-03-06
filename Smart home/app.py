from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Simulated appliance data
appliance_data = {
    "lights": {"usage": [10, 15, 12, 14], "suggestions": ["Use LED bulbs", "Turn off lights when not needed"]},
    "ac": {"usage": [30, 35, 32, 28], "suggestions": ["Set AC at 24°C", "Use energy-efficient mode"]},
    "refrigerator": {"usage": [18, 20, 19, 17], "suggestions": ["Keep fridge door closed", "Defrost regularly"]},
    "others": {"usage": [8, 10, 9, 7], "suggestions": ["Unplug unused devices", "Use smart plugs"]},
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/device.html')
def device_page():
    return render_template('device.html')

@app.route('/reports.html')
def reports_page():
    return render_template('reports.html')

@app.route('/settings.html')
def settings_page():
    return render_template('settings.html')

@app.route('/get_device_data', methods=['GET'])
def get_device_data():
    device = request.args.get('device')
    if device in appliance_data:
        return jsonify(appliance_data[device])
    return jsonify({"error": "Device not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)

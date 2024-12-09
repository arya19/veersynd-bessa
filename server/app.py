from flask import Flask, request, jsonify, send_from_directory, send_file, make_response, redirect
from flask_cors import CORS
from dotenv import load_dotenv
import os
from resume_tailor import ResumeTailor

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route("/upload_files", methods=["POST"])
def upload_files():
    try:
        if not request.form.get("resumePoints") or (not request.form.get("jobDescription") and "jobDescriptionfile" not in request.files):
            return jsonify({"error": "Missing required fields"}), 400

        resumePoints = request.form.get("resumePoints")
        jdText = request.form.get("jobDescription")
        jdFile = request.files.get("jobDescriptionfile")
        if jdFile:
            file_data = jdFile.read()

        api_key = os.getenv("api_key")
        jd_data = jdText if jdFile == None else file_data
        resume_tailor = ResumeTailor(api_key, resumePoints, jd_data)
        flag = resume_tailor.validate_jd()
        if not flag:
            return jsonify({"error": "Are you sure this resume point is relevant to the JD? Consider removing it from your resume or be a little more specific."}), 400

        resume_tailored = resume_tailor.customize_resume()

        return jsonify({"success": True, "resume": str(resume_tailored)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)

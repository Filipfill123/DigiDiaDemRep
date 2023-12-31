from dialog import SpeechCloudWS, Dialog
import logging
import json
import os
import string
import random
import urllib.request
import asyncio

class AdDialog(Dialog):

    async def main(self):
        # TODO vytvorit slozku data, pokud neni
        with open(f"data/last_id.json", "r") as f:
            last_id = json.load(f)
            await self.send_message({"message": "last_id", "data": last_id})
        
        await asyncio.sleep(36000000)   

        # await self.check_microphone()
        # await self.patient_identification()
        # await self.repeat_numbers()
        # await self.lake_picture()
        # await self.animals_remembering()

    def on_receive_message(self, data):
        session = self.session_id
        msg = json.loads(data)
        topic = msg['topic']
        print('Webserver: Received WS message:', data)
        
        try:
            if(topic == "patientIdentification"):
                
                #session = self.session_id
                patientId = msg["patientId"]
                patientId = int(patientId)
                
                patientName = msg["lname"] + msg["fname"]
                patientCategory = msg["patientCategory"]

                current_dir = os.getcwd()

                path_to_data = os.path.join(current_dir, "data")
                #session = self.id_generator()
                path_to_data_session = os.path.join(path_to_data, session)

                # Check whether the specified path exists or not
                isExist = os.path.exists(path_to_data_session)

                if not isExist:
                    print("created new directory")
                    # Create a new directory because it does not exist 
                    os.mkdir(path_to_data_session)
  
                
                path_to_data_session_name = os.path.join(path_to_data_session, patientName)
                os.mkdir(path_to_data_session_name)
                path_to_data_session_name_records = os.path.join(path_to_data_session_name, "records")
                os.mkdir(path_to_data_session_name_records)

                with open(f"data/{session}/{patientName}/{patientName}.json", "a") as session_file:
                    json.dump(msg, session_file)
                if(patientCategory != "TEST"):
                    print("this is not test, saving last_id")
                    with open(f"data/last_id.json", "w") as last_id_file:
                        dump_data = {"last_id": patientId}
                        json.dump(dump_data, last_id_file)
                
            
            elif(topic == 'animalsRemembering'):
                patientName = msg["lname"] + msg["fname"]
                with open(f"data/{session}/{patientName}/animals.json", "w", encoding="utf-8") as animals_file:
                    json.dump(msg, animals_file)
            elif(topic =='ASR_audio'):
                patientName = msg["lname"] + msg["fname"]
                url = msg["msg"]["uri"]
                record_id = msg["msg"]["id"]
                with open(f"data/{session}/{patientName}/records/{record_id}.json", "w") as record_file:
                    json.dump(msg, record_file)
                urllib.request.urlretrieve(url, f"data/{session}/{patientName}/records/{record_id}.wav")

        except (ValueError):
            print('Webserver: Received WS message:', data)
        except (KeyError):
            print('Webserver: Received WS message:', data)

if __name__ == '__main__':
    logging.basicConfig(format='%(asctime)s %(levelname)-10s %(message)s',level=logging.DEBUG)

    SpeechCloudWS.run(AdDialog, address="0.0.0.0", port=8888, static_path='./static')
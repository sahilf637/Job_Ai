# actions/actions.py
import requests
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionSendEntitiesToBackend(Action):
    def name(self) -> Text:
        return "action_send_entities_to_backend"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Collect slot values (if any are still None, you might want to handle that)
        ctc = tracker.get_slot("ctc")
        notice_period = tracker.get_slot("notice_period")
        date = tracker.get_slot("date")
        time = tracker.get_slot("time")
        
        payload = {
            "ctc": ctc,
            "notice_period": notice_period,
            "date": date,
            "time": time
        }
        backend_url = "http://your-backend-url/api/receive_entities"  # Change this URL

        try:
            response = requests.post(backend_url, json=payload)
            if response.status_code == 200:
                dispatcher.utter_message(text="Data sent to backend successfully.")
            else:
                dispatcher.utter_message(text="Failed to send data to backend.")
        except Exception as e:
            dispatcher.utter_message(text=f"Error sending data: {e}")

        return []

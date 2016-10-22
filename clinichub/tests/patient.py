from test_addons import MongoTestCase as TestCase
from clinichub.models import *

class PatientTestCase(TestCase):
    def test_create_patient(self):
        jack = Patient.create_user('jack', 'jack1234')
        self.assertEqual(jack.username, 'jack')

    def test_update_patient(self):
        jack = Patient.create_user('jack', 'jack1234')
        jack.email = 'jack@example.com'
        jack.firstname = 'Jack'
        jack.lastname = 'Jackjackjack'
        jack.balance = 0
        jack.save()

        self.assertEqual(jack.email, 'jack@example.com')
        self.assertEqual(jack.firstname, 'Jack')
        self.assertEqual(jack.lastname, 'Jackjackjack')
        self.assertEqual(jack.balance, 0)


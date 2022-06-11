import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
  {
    question: "Can I cancel my order?",
    answer:
      `Once you click "Place Order", you will not be able to cancel your order.`,
  },
  {
    question: "My order did not arrive, what should I do?",
    answer:
      "On the Partner With Us page, you can contact Juanify by sending an email or calling the provided contact number.",
  },
  {
    question: "Can I rate the restaurant?",
    answer:
      "Yes, but this is only available to those who have already ordered from that restaurant.",
  },
  {
    question: "Can I order from multiple restaurants?",
    answer:
      "No, you can only order from one restaurant. When you add products from another restaurant, previous products added will then be removed and will be replaced with newly added ones.",
  },
  {
    question: "What are the modes of payment?",
    answer:
      "For now, Paypal and Cash on Delivery are the modes of payment available.",
  },
  {
    question: "Where can I see my previous orders?",
    answer:
      "On your profile page, you will see the list of all orders that you have made.",
  },
  {
    question: "Can I report a restaurant?",
    answer:
      "If you have already ordered from the restaurant, you can add a review instead, or you can contact Juanify by writing an email provided on the Partner With Us Page.",
  },
  {
    question: "Who can be a partner?",
    answer:
      "All Micro Small Medium Enterprise engage in the food industry in Davao City.",
  },
  {
    question: "How to be a partner?",
    answer:
      "Log in to juanify web app and accomplished the partner invitation form.",
  },
  {
    question: "After sign up what will happen?",
    answer:
      "You will be interviewed by Juanify to validate your business.",
  },
  {
    question: "How do Juanify validate?",
    answer:
      "Juanify will ask for the address, pictures of the business location, products and social media account if available.",
  },
  {
    question: "What happens after validation?",
    answer:
      "Eligible partners will be presented with MOA. Non eligible partners will be given recommendations to comply to be a partner.",
  },
  {
    question: "How long does it take to be on Juanify?",
    answer:
      "If the business is digital ready 3-7 days. If not 3-15 days.",
  },
  {
    question: "How much will be the fee?",
    answer:
      "Fees will be presented and discussed on the MOA.",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const FAQScreen = () => {
    return (
        <div className="bg-gray-50">
            <div className="max-w-screen-xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 xl:px-0">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8'>
                    <div>
                        <img className='mx-auto w-[200px] lg:w-auto' src='./images/faq.png' />
                    </div>
                    <div className="divide-y-2 divide-gray-200">
                        <p className="text-3xl font-extrabold sm:text-5xl underline lg:block hidden"><span className='text-blue-700'>F</span><span className='text-red-500'>A</span><span className='text-yellow-500'>Q</span>'s</p>
                        <dl className="mt-6 space-y-6 divide-y divide-gray-200 h-[500px] overflow-y-scroll">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-6 ">
                            {({ open }) => (
                                <>
                                <dt className="text-lg">
                                    <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                                    <span className="font-medium text-gray-900">{faq.question}</span>
                                    <span className="ml-6 h-7 flex items-center">
                                        <ChevronDownIcon
                                        className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                        aria-hidden="true"
                                        />
                                    </span>
                                    </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                    <p className="text-base text-gray-500">{faq.answer}</p>
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                        ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQScreen
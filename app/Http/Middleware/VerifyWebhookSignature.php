<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyWebhookSignature
{
    /**
     * Verify that the incoming webhook request has a valid HMAC-SHA256 signature.
     *
     * The POS system must send a header "X-Webhook-Signature" containing:
     *   hash_hmac('sha256', $requestBody, $webhookSecret)
     */
    public function handle(Request $request, Closure $next): Response
    {
        $secret = config('services.pos.webhook_secret');

        if (empty($secret)) {
            abort(500, 'Webhook secret is not configured.');
        }

        $signature = $request->header('X-Webhook-Signature');

        if (empty($signature)) {
            abort(403, 'Missing webhook signature.');
        }

        $expectedSignature = hash_hmac('sha256', $request->getContent(), $secret);

        if (! hash_equals($expectedSignature, $signature)) {
            abort(403, 'Invalid webhook signature.');
        }

        return $next($request);
    }
}
